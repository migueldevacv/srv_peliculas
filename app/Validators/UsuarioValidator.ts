import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public newSchema = schema.create({
    nombre: schema.string({trim:true}),
    f_nacimiento: schema.date({
      format: 'sql',
    }),
    nacionalidad: schema.string(),
    username: schema.string(),
    rol: schema.enum(['ADMIN', 'USER']),
    email: schema.string({}, [
      rules.email({
        sanitize: true,
        ignoreMaxLength: true,
        domainSpecificValidation: true,
      }),
      // rules.unique({ table: 'usuarios', column: 'email' })
    ]),
    password: schema.string({}, [
      rules.confirmed('password_confirmation')
    ]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
