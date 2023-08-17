export interface ResetPasswordProps {
  id?: string;
  token: string;
  expiresAt: Date;
  userId: string;
}

export class ResetPassword {
  private props: ResetPasswordProps;

  constructor(props: ResetPasswordProps) {
    const { expiresAt } = props;

    if (this.hasExpired(expiresAt as Date))
      throw new Error("Token has expired");

    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get token() {
    return this.props.token;
  }

  get expiresAt() {
    return this.props.expiresAt;
  }

  get userId() {
    return this.props.userId;
  }

  hasExpired(expiresAt: Date): boolean {
    const actualDate = new Date();

    return actualDate < expiresAt ? false : true;
  }

  getSummary() {
    return {
      id: this.props.id,
      token: this.props.token,
      expiresAt: this.props.expiresAt,
      userId: this.props.userId,
    };
  }
}
