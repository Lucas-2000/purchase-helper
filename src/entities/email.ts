export interface EmailProps {
  email: string;
  body: string;
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

  get body() {
    return this.props.body;
  }

  get subject() {
    return this.props.subject;
  }

  getSummary(): EmailProps {
    return {
      email: this.props.email,
      body: this.props.body,
      subject: this.props.subject,
    };
  }
}
