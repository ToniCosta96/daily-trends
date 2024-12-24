/** Utilidad para dar formatos específicos a las fechas. */
export class CustomDate {
  /** RegExp para formato 'YYYY-MM-DD'. */
  static readonly DATE_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

  constructor(private date: Date = new Date()) {}

  /** Obtiene la fecha como string con el formato 'YYYY-MM-DD'. */
  format(): string {
    return `${this.date.getFullYear()}-${this.date.getMonth().toString().padStart(2, '0')}-${this.date.getDate().toString().padStart(2, '0')}`;
  }
}
