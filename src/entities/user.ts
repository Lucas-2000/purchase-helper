export interface UserProps {
  id: string;
  username: string;
  email: string;
  password: string;
  type: string;
}

export class User {
  private props: UserProps;

  get id() {
    return this.props.id;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get type() {
    return this.props.type;
  }
}
