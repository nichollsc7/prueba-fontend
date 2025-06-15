import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import configureStore from 'redux-mock-store';
import { UserList } from '../UserList';
import { UserDetail } from '../UserDetail';
import { mockUsers } from '../../__mocks__/mockData';
import { RootStackParamList, UserDetailScreenRouteProp } from '../../types/navigation';

const mockStore = configureStore([]);
const store = mockStore({
  users: {
    users: mockUsers,
    loading: false,
    error: null,
    selectedUser: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      address: {
        street: 'Main St',
        suite: 'Apt 1',
        city: 'City',
        zipcode: '12345',
      },
      company: {
        name: 'Company',
        catchPhrase: 'Catch phrase',
        bs: 'bs',
      },
    },
  }
});

const Stack = createNativeStackNavigator<RootStackParamList>();

// Mock del hook useNavigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: any }) => children,
    Screen: ({ children }: { children: any }) => children,
  }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ isDarkMode: false, toggleTheme: jest.fn() }),
}));

jest.mock('../../store/userSlice', () => ({
  fetchUsers: () => ({ type: 'users/fetchUsers' }),
  fetchUserById: () => ({ type: 'users/fetchUserById' }),
}));

const renderWithNavigation = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="UserDetail" component={UserDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

describe('UserList', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    store.clearActions();
  });

  it('renders loading state initially', () => {
    const loadingStore = mockStore({
      users: {
        users: [],
        loading: true,
        error: null,
        selectedUser: null,
      }
    });
    
    const { getByText } = render(
      <Provider store={loadingStore}>
        <UserList />
      </Provider>
    );
    expect(getByText('Cargando usuarios...')).toBeTruthy();
  });

  it('renders error state when there is an error', () => {
    const errorStore = mockStore({
      users: {
        users: [],
        loading: false,
        error: 'Error al cargar usuarios',
        selectedUser: null,
      }
    });
    
    const { getByText } = render(
      <Provider store={errorStore}>
        <UserList />
      </Provider>
    );
    expect(getByText('Error al cargar usuarios')).toBeTruthy();
  });

  it('renders user list correctly', () => {
    const { getByText } = renderWithNavigation(<UserList />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('filters users based on search query', () => {
    const { getByPlaceholderText, getByText, queryByText } = renderWithNavigation(<UserList />);
    
    const searchInput = getByPlaceholderText('Buscar por nombre o email...');
    fireEvent.changeText(searchInput, 'John');
    
    expect(getByText('John Doe')).toBeTruthy();
    expect(queryByText('Jane Smith')).toBeNull();
  });

  it('navigates to user detail when a user is pressed', () => {
    const { getByText } = renderWithNavigation(<UserList />);
    
    const userItem = getByText('John Doe');
    fireEvent.press(userItem);
    expect(mockNavigate).toHaveBeenCalledWith('UserDetail', { userId: 1 });
  });
});

describe('UserDetail', () => {
  const mockRoute: UserDetailScreenRouteProp = {
    params: { userId: 1 },
    key: 'test-key',
    name: 'UserDetail'
  };

  it('renders user details correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserDetail 
          route={mockRoute}
          navigation={{} as any}
        />
      </Provider>
    );

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
  });

  it('shows loading state initially', () => {
    const loadingStore = mockStore({
      users: {
        users: [],
        loading: true,
        error: null,
        selectedUser: null,
      }
    });

    const { getByText } = render(
      <Provider store={loadingStore}>
        <UserDetail 
          route={mockRoute}
          navigation={{} as any}
        />
      </Provider>
    );
    expect(getByText('Cargando detalles del usuario...')).toBeTruthy();
  });

  it('shows error state when user is not found', () => {
    const errorStore = mockStore({
      users: {
        users: [],
        loading: false,
        error: 'Usuario no encontrado',
        selectedUser: null,
      }
    });

    const { getByText } = render(
      <Provider store={errorStore}>
        <UserDetail 
          route={{ ...mockRoute, params: { userId: 999 } }}
          navigation={{} as any}
        />
      </Provider>
    );

    expect(getByText('Usuario no encontrado')).toBeTruthy();
  });
}); 