import { InputType, Field } from "type-graphql"
import { User } from "./user.entity"

@InputType()
export class UpdateInput implements Partial<User> {
  @Field()
  firstName?: string

  @Field()
  lastName?: string

  @Field()
  email?: string

  @Field()
  password?: string

  @Field()
  houseId?: string
}

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
