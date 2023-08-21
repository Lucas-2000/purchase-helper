import { ProductProps } from "./product";

export interface PurchaseListProps {
  id: string;
  listName: string;
  products: ProductProps[];
  purchaseStart?: Date | null;
  purchaseFinish?: Date | null;
  userId: string;
}

export class PurchaseList {
  private props: PurchaseListProps;

  constructor(props: PurchaseListProps) {
    const { purchaseStart, purchaseFinish } = props;

    if ((purchaseStart as Date) > (purchaseFinish as Date))
      throw new Error(
        "Purchase finish datetime must be higher than purchase start datetime"
      );

    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get listName() {
    return this.props.listName;
  }

  get products() {
    return this.props.products;
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

  getSummary() {
    return {
      id: this.props.id,
      listName: this.props.listName,
      products: this.props.products,
      purchaseStart: this.props.purchaseStart,
      purchaseFinish: this.props.purchaseFinish,
      userId: this.props.userId,
    };
  }
}
