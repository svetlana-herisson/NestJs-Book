export class CreateBookDto {
  readonly title: string;
  readonly description: string;
  readonly authors?: string;
  readonly favorite?: boolean;
}
