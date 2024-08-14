import { Column, Entity, Index, PrimaryColumn,OneToMany } from "typeorm";
import { Userlogin } from "./Userlogin";

// @Index("userinfo_pkey", ["id"], { unique: true })
@Entity("otp", { schema: "public" })
export class OTP {
  @PrimaryColumn("bigint", { name: "id" })
  ID: number;

  @Column("character varying", {
    name: "userid",
    nullable: true,
    length: 100,
  })
  USERID: string | null;

  @Column("character varying", { name: "key", nullable: true, length: 30 })
  KEY: string | null;


  @Column("character varying", { name: "value", nullable: true, length: 30 })
  VALUE: string | null;

  @Column("character varying", { name: "status", nullable: true, length: 30 })
  STATUS: string | null;

  @Column("timestamp without time zone", { name: "datetime", nullable: true })
  DATETIME: Date | null;
}
