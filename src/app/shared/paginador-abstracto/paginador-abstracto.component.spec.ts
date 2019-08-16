import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { PaginadorAbstractoComponent } from "./paginador-abstracto.component"
import { EventEmitter, Component } from "@angular/core"

describe("PaginadorAbstractoComponent valores por default", () => {
  let component: PaginadorAbstractoComponent
  let fixture: ComponentFixture<PaginadorAbstractoComponent>

  beforeEach(async(() => {
    // Definimos las declaraciones para poder acceder al componente.
    TestBed.configureTestingModule({
      declarations: [PaginadorAbstractoComponent]
    }).compileComponents()
  }))

  //Este beforeEach se ejecuta despues del asyn de arriba.
  beforeEach(() => {
    // Se requiere delaration en el TestBed.configureTestingModule para
    // que funcionen las pruebas con el componente.
    fixture = TestBed.createComponent(PaginadorAbstractoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("deberia crear el este componente", () => {
    expect(component).toBeTruthy()
  })

  it("esteComponente deberia estar inicializado", () => {
    expect(component.esteComponente).not.toBeNull()
  })

  it("debug deberia estar en falso", () => {
    expect(component.debug).toBeFalsy()
  })

  it("totalDeElementos deberia ser 0", () => {
    expect(component.totalDeElementos).toBe(0)
  })

  it("activarPaginador deberia ser falso", () => {
    expect(component.activarPaginador).toBeFalsy()
  })

  it("cargandoDatos deberia deberia ser verdadero", () => {
    expect(component.cargandoDatos).toBeTruthy()
  })

  it("paginaActual deberia ser 1", () => {
    expect(component.paginaActual).toBe(1)
  })

  it("totalDePaginas deberia ser 1", () => {
    expect(component.totalDePaginas).toBe(1)
  })

  it("esPrimeraPagina deberia ser true", () => {
    expect(component.esPrimeraPagina).toBeTruthy()
  })

  it("esUltimaPagina deberia ser false", () => {
    expect(component.esUltimaPagina).toBeFalsy()
  })

  it("elementosPorPaginaSeleccionado deberia ser undefined", () => {
    expect(component.elementosPorPaginaSeleccionado).toBeUndefined()
  })

  it("actualizacion debe estar inicializada", () => {
    expect(component.actualizacion).not.toBeNull()
    expect(component.actualizacion).not.toBeUndefined()
  })
})
