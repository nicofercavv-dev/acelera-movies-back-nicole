import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "title", type: "varchar" })
  title: string

  @Column({ name: "subtitle", type: "varchar" })
  subtitle: string

  @Column({ name: "resume", type: "text" })
  resume: string

  @Column({ name: "gender", type: "varchar" })
  gender: string

  @Column({ name: "classification", type: "varchar" })
  classification: string

  @Column({ name: "image", type: "varchar" })
  image: string

  @Column({ name: "releaseDate", type: "date" })
  releaseDate: Date

  @Column({ name: "director", type: "varchar" })
  director: string

  @Column({ name: "writter", type: "varchar" })
  writter: string

  @Column({ name: "studio", type: "varchar" })
  studio: string

  @Column({ name: "actors", type: "text", array: true, default: "{}" })
  actors: Array<string>

  @Column({ name: "awards", type: "text", array: true, default: "{}" })
  awards: Array<string>

  @Column({ name: "note", type: "integer" })
  note: number

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date
}
