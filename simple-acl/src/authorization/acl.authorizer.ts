import {Provider, inject} from '@loopback/core';
import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';
import {AclRepository} from '../repositories/acl.repository';

export class AclAuthorizerProvider implements Provider<Authorizer> {
  constructor(@inject('repositories.AclRepository') private aclRepo: AclRepository) {}
    
  value(): Authorizer {
    return async (
      authorizationCtx: AuthorizationContext,
      metadata: AuthorizationMetadata,
    ) => {
        
      const user = authorizationCtx.principals[0]; // JWT user {id, role}
      const role = user?.role;
      const method = metadata.resource;
        console.log('Role:', role, 'Method:', method);
      if (!role || !method) return AuthorizationDecision.DENY;

      const rule = await this.aclRepo.findOne({
        where: {principalid: role, property: method},
      });

      console.log('Rule found:', rule);
      if (rule && rule.permission === 'ALLOW') {
        return AuthorizationDecision.ALLOW;
      }

      return AuthorizationDecision.DENY;
    };
  }
}
