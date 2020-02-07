export class Pokemon {
  constructor(data) {
    if (!data) {
      return;
    }
    this._id = data._id;
    this.name = data.name;
    if (data.sprites) {
      this.img = data.sprites.front_default;
    } else {
      this.img = data.img;
    }
    this.weight = data.weight;
    this.height = data.height;
    this.types = data.types;
  }

  get ListTemplate() {
    return /* html */ `
    <div onclick="app.pokemonController.getPokemon('${this.name}')">
      <p>${this.name}</p>
    </div>
  `;
  }

  get DetailsTemplate() {
    let button = this._id
      ? /* html */ `
    <button class="btn btn-danger" onclick="app.pokemonController.releasePokemon('${this._id}')">     
      Release
    </button>
    `
      : /* html */ `
    <button class="btn btn-info" onclick="app.pokemonController.catchPokemon()">     
      Catch
    </button>
    `;
    return /* html */ `
    <div class="card shadow">
      <img src="${this.img}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
          <p class="card-text">
            <span>
              Weight: ${this.weight} - Height: ${this.height} 
            </span>
          </p>
          ${button}
        </div>
    </div>
    `;
  }

  get MyPokemonTemplate() {
    return /* html */ `
      <div class="border p-2 mb-1">
        <div class="d-flex align-items-center justify-content-between">
        <div>
          <img src="${this.img}" height="65">
          <span class="ml-2">${this.name}</span>
        </div>
        <span class="text-danger" onclick="app.pokemonController.releasePokemon('${this._id}')">&times;</span>
        </div>
      </div>
    `;
  }
}
