import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import GameIndexTile from "./GameIndexTile"
Enzyme.configure({ adapter: new Adapter() })

describe("GamesIndexTile", () => {
  let wrapper
  let testGame

  beforeEach(() => {
    testGame = { id: 1, title: "Zelda" }
    wrapper = mount(
      <GameIndexTile game={testGame} />
    )
  })

  it("should render an h4 element containing the title of the game received via props", () => {
      expect(wrapper.find("h4").text()).toBe(testGame.title)
  })
})
