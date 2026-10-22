import { Injectable, inject } from '@angular/core';
import { Api } from './api';
import type { EdicionVacante, NuevaVacante, Vacante } from './modelos';

@Injectable({ providedIn: 'root' })
export class VacantesServicio {
  readonly #api = inject(Api);

  listar = () => this.#api.get<Vacante[]>('/vacantes');
  obtener = (id: string) => this.#api.get<Vacante>(`/vacantes/${id}`);
  crear = (datos: NuevaVacante) => this.#api.post<Vacante>('/vacantes', datos);
  editar = (id: string, datos: EdicionVacante) => this.#api.patch<Vacante>(`/vacantes/${id}`, datos);
  /** Reemplaza la lista completa. Solo mientras la vacante es borrador. */
  definirEjercicios = (id: string, idsDeEjercicios: string[]) =>
    this.#api.put<Vacante>(`/vacantes/${id}/ejercicios`, { idsDeEjercicios });
  invitarCandidato = (id: string, idCandidato: string) =>
    this.#api.post<Vacante>(`/vacantes/${id}/candidatos`, { idCandidato });
  publicar = (id: string) => this.#api.post<Vacante>(`/vacantes/${id}/publicar`);
  cerrar = (id: string) => this.#api.post<Vacante>(`/vacantes/${id}/cerrar`);
}
