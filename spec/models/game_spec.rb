require "rails_helper"

describe Game do
  let(:title) { "Valid Title" }
  let(:description) { "Valid description text" }
  let(:game) do
    Game.new({
      title: title,
      description: description
    })
  end

  let(:game_initialized_without_arguments) { Game.new }

  describe ".new" do
    it "should return a Game object" do
      expect(game).to be_a(Game)
    end

    it "should not raise an error when initialized without any arguments" do
      expect{ game_initialized_without_arguments }.to_not raise_error
    end
  end

  describe "#title" do
    it "should return the title" do
      expect(game.title).to eq(title)
    end

    it "should return nil for an game initialized without arguments" do
      expect(game_initialized_without_arguments.title).to eq(nil)
    end
  end

  describe "#description" do
    it "should return the description" do
      expect(game.description).to eq(description)
    end

    it "should return nil for an game initialized without arguments" do
      expect(game_initialized_without_arguments.description).to eq(nil)
    end
  end

  describe ".all" do
    it "should return an array of Game objects from the database" do
      first_game_data = [
        "Valid Title 1",
        "Valid description text 1"
      ]

      last_game_data = [
        "Valid Title 2",
        "Valid description text 2"
      ]

      Game.create(title: first_game_data.first, description: first_game_data.last)
      Game.create(title: last_game_data.first, description: last_game_data.last)

      games = Game.all

      first_game = games.first
      first_game_attributes = [
        first_game.title,
        first_game.description,
      ]
      last_game = games.last
      last_game_attributes = [
        last_game.title,
        last_game.description
      ]

      expect(games.length).to eq(2)
      expect(first_game).to be_a(Game)
      expect(last_game).to be_a(Game)
      expect(first_game_attributes).to eq(first_game_data)
      expect(last_game_attributes).to eq(last_game_data)
    end
  end

  describe "#errors" do
    it "should return an empty array for a newly initialized object" do
      expect(game.errors.messages).to eq({})
    end
  end

  describe "#valid?" do
    context "for a valid object" do
      it "should return true" do
        expect(game.valid?).to eq(true)
      end

      it "should not add any error messages" do
        game.valid?
        expect(game.errors.messages).to eq({})
      end
    end

    context "for an invalid object" do
      let(:game_with_blank_attributes) do
        Game.new({ title: "", description: "" })
      end

      let(:missing_title_message) {"Title can't be blank"}

      it "should return false" do
        expect(game_with_blank_attributes.valid?).to eq(false)
      end

      it "should add an error message if any of the required attributes are blank" do
        game_with_blank_attributes.valid?
        expect(game_with_blank_attributes.errors.full_messages).to eq([missing_title_message])
      end
    end
  end

  describe "#save" do
    context "valid object" do
      it "should return true" do
        expect(game.save).to eq(true)
      end

      it "should add the attributes to the database" do
        game.save

        game_attributes = [
          game.title,
          game.description
        ]

        games_data = nil

        games_data = Game.all
        game_data = games_data.last

        expect(game_attributes[0]).to eq(game_data["title"])
        expect(game_attributes[1]).to eq(game_data["description"])
      end
    end

    context "invalid object" do
      let(:game_with_blank_attributes) do
        Game.new({ title: "", description: "" })
      end

      it "should return false" do
        expect(game_with_blank_attributes.save).to eq(false)
      end

      it "should not add the attributes to the database" do
        game_with_blank_attributes.save

        games_data = nil

        games_data = Game.all
        expect(games_data.count).to eq(0)
      end
    end
  end
end
