interface PrismaEnumUserType {
  standard: "standard";
  premium: "premium";
}

export type EnumUserType = keyof PrismaEnumUserType;
