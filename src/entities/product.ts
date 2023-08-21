export interface ProductProps {
  id?: string;
  name: string;
  description?: string | null;
  price?: number | null;
  quantity: number;

  userId: string;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    const { price, quantity } = props;

    if ((price as number) < 0) throw new Error("Invalid price");

    if (quantity < 0) throw new Error("Invalid quantity");

    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }

  get quantity() {
    return this.props.quantity;
  }

  get userId() {
    return this.props.userId;
  }

  getSummary(): ProductProps {
    return {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      quantity: this.props.quantity,
      userId: this.props.userId,
    };
  }
}
