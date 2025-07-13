import "express"; // 👈 this is key

declare module "express" {
  export interface Request {
    user?: {
      id: string;
      name?: string;
      role?: string;
      user?: User;
    };
  }
}
