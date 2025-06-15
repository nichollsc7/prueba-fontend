import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { userId: number };
};

export type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
export type UserDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;

export type UserDetailProps = {
  route: UserDetailScreenRouteProp;
  navigation: UserDetailScreenNavigationProp;
}; 