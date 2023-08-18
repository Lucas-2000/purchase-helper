export interface ProductProps {
  id?: string;
  name: string;
  description?: string | null;
  price?: number | null;
  quantity: number;
  purchaseStart?: Date | null;
  purchaseFinish?: Date | null;
  userId: string;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    const { purchaseStart, purchaseFinish, price, quantity } = props;

    if ((price as number) < 0) throw new Error("Invalid price");

    if (quantity < 0) throw new Error("Invalid quantity");

    if ((purchaseStart as Date) > (purchaseFinish as Date))
      throw new Error(
        "Purchase finish datetime must be higher than purchase start datetime"
      );

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

  get purchaseStart() {
    return this.props.purchaseStart;
  }

  get purchaseFinish() {
    return this.props.purchaseFinish;
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
      purchaseStart: this.props.purchaseStart,
      purchaseFinish: this.props.purchaseFinish,
      userId: this.props.userId,
    };
  }
}
