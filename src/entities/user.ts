import { EnumUserType } from "../utils/dicts/enumUserType";

export interface UserProps {
  id: string;
  username: string;
  email: string;
  password: string;
  type: EnumUserType;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    const { password } = props;

    if (password.length < 8) {
      throw new Error(`Invalid password lenght`);
    }

    this.props = props;
  }

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

  getSummary(): UserProps {
    return {
      id: this.props.id,
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
      type: this.props.type,
    };
  }
}
