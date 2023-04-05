import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { ESTADO_FETCH } from "./constants";
import { obtenerCita } from "./citaAPI";
import { ICita } from "./types";

/**
Representa el estado de la cita.
@typedef {Object} EstadoCita
@property {ICita|null} data - La cita obtenida de la API.
@property {ESTADO_FETCH} estado - El estado del fetch de la cita.
*/
export interface EstadoCita {
  data: ICita | null;
  estado: ESTADO_FETCH;
}

/** 
El estado inicial de la cita.
@type {EstadoCita}
*/
const initialState: EstadoCita = {
  data: null,
  estado: ESTADO_FETCH.INACTIVO,
};

/**
Acción async para obtener la cita desde una API y actualizar el estado.
@function
@name obtenerCitaAsync
@memberof module:citaSlice
@param {string} personaje - El personaje para obtener la cita. Si no se provee, se obtiene una cita aleatoria.
@returns {Promise<ICita>} - La cita obtenida.
*/
export const obtenerCitaAsync = createAsyncThunk(
  "cita/obtenerCita",
  async (personaje: string) => {
    try {
      const cita = await obtenerCita(personaje);

      return cita;
    } catch (err) {
      throw err;
    }
  }
);

/**
Slice de Redux para el estado de la cita.
@type {Slice}
@name citaSlice
@namespace
@memberof module:citaSlice
@prop {EstadoCita} initialState - El estado inicial del slice.
@prop {Object} reducers - Reducers síncronos para el slice.
@prop {Function} extraReducers - Manejadores de acciones asincrónicas para el slice.
*/
export const citaSlice = createSlice({
  name: "citas",
  initialState,
  reducers: {
    limpiar: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(obtenerCitaAsync.pending, (state) => {
        state.estado = ESTADO_FETCH.CARGANDO;
      })
      .addCase(obtenerCitaAsync.fulfilled, (state, action) => {
        state.estado = ESTADO_FETCH.INACTIVO;
        state.data = action.payload;
      })
      .addCase(obtenerCitaAsync.rejected, (state) => {
        state.estado = ESTADO_FETCH.ERROR;
      });
  },
});

export const { limpiar } = citaSlice.actions;

export const obtenerCitaDeLaAPI =
  (personaje: string) => (dispatch: AppDispatch) => {
    dispatch(limpiar());
    dispatch(obtenerCitaAsync(personaje));
  };

  
export const obtenerCitaDelEstado = (state: RootState) => state.cita.data;
export const obtenerEstadoDelPedido = (state: RootState) => state.cita.estado;

export default citaSlice.reducer;
