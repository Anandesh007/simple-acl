import {Entity, model, property} from '@loopback/repository';

@model()
export class Acl extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  accesstype: string;

  @property({
    type: 'string',
    required: true,
  })
  principaltype: string;

  @property({
    type: 'string',
    required: true,
  })
  principalid: string;

  @property({
    type: 'string',
    required: true,
  })
  permission: string;

  @property({
    type: 'string',
    required: true,
  })
  property: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Acl>) {
    super(data);
  }
}

export interface AclRelations {
  // describe navigational properties here
}

export type AclWithRelations = Acl & AclRelations;
