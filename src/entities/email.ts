export interface EmailProps {
  email: string;
  token: string;
  subject: string;
}

export class Email {
  private props: EmailProps;

  constructor(props: EmailProps) {
    this.props = props;
  }

  get email() {
    return this.props.email;
  }

  get token() {
    return this.props.token;
  }

  get subject() {
    return this.props.subject;
  }

  getSummary(): EmailProps {
    return {
      email: this.props.email,
      token: this.props.token,
      subject: this.props.subject,
    };
  }
}
