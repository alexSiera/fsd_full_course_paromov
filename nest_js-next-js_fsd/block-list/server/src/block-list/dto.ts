import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';

export class BlockItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  blockListId: number;

  @ApiProperty({
    enum: [$Enums.EBlockItemType.Keyword, $Enums.EBlockItemType.Website],
  })
  type: $Enums.EBlockItemType;

  @ApiProperty()
  data: string;

  @ApiProperty()
  createdAt: Date;
}

export class BlockListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({
    type: [BlockItemDto],
  })
  items: BlockItemDto[];
}

export class BlockListQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    enum: [$Enums.EBlockItemType.Keyword, $Enums.EBlockItemType.Website],
  })
  @IsIn([$Enums.EBlockItemType.Keyword, $Enums.EBlockItemType.Website])
  type: $Enums.EBlockItemType;

  @ApiProperty()
  data: string;
}
