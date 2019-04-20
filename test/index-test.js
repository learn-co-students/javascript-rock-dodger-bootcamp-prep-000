describe('Rock Dodger', () => {
  afterEach(function() {
    expect.restoreSpies()
  })

  describe('checkCollision(rock)', () => {
    /**
     * DODGER starts out at left = 180px
     */
    describe('rock is <= 360px from the top of GAME', () => {
      it('does not collide', () => {
        let rock = document.createElement('div')
        rock.className = 'rock'
        rock.style.top = '2px'
        rock.style.left = '0px'

        expect(checkCollision(rock)).toNotBe(true)

        rock = null
      })
    })

    describe('rock is > 360px from the top of GAME', () => {
      let rock

      beforeEach(() => {
        rock = document.createElement('div')
        rock.className = 'rock'
        rock.style.top = '362px'
      })

      afterEach(() => {
        rock = null
      })

      it('does not collide if not within DODGER\'s bounds', () => {
        rock.style.left = '0px'

        expect(checkCollision(rock)).toNotBe(true)
      })

      it("collides if the rock's left edge is <= the DODGER's left edge and the rock's right edge is >= the DODGER's left edge", () => {
        rock.style.left = '170px'

        expect(checkCollision(rock)).toBe(true)
      })

      it("collides if the rock's left edge is >= the DODGER's left edge and the rock's right edge is <= the DODGER's right edge", () => {
        rock.style.left = '180px'

        expect(checkCollision(rock)).toBe(undefined)
      })

      it("collides if the rock's left edge is <= the DODGER's right edge and the rock's right edge is >= the DODGER's right edge", () => {
        rock.style.left = '219px'

        expect(checkCollision(rock)).toBe(true)
      })
    })
  })

})
