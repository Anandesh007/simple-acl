import {get, post, del, param} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';

export class ProductController {
  constructor() {}

  
  @post('/products')
  @authenticate('jwt')
  @authorize({resource: 'create'})
  async createProduct() {
    return {message: 'Product created'};
  }

  @get('/products')
  @authenticate('jwt')
  @authorize({resource: 'find'})
  async listProducts() {
    return [{id: 1, name: 'Laptop'}];
  }

  @get('/products/{id}')
  @authenticate('jwt')
  @authorize({resource: 'findById'})
  async getProduct(@param.path.number('id') id: number) {
    return {id, name: 'Laptop'};
  }

  @del('/products/{id}')
  @authenticate('jwt')
  @authorize({resource: 'delete'})
  async deleteProduct(@param.path.number('id') id: number) {
    return {message: `Product ${id} deleted`};
  }
}
