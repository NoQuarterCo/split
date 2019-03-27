import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"
import { House } from "../house/house.entity"

@ObjectType()
@Entity()
export class Invite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  houseId: string

  @ManyToOne(() => House, house => house.invites)
  house: House

  @Field()
  @CreateDateColumn()
  createdAt: string

  @Field()
  @UpdateDateColumn()
  updatedAt: string
}