require "rails_helper"

describe Game do
  let!(:game) { Game.new( title: "Valid Title", image: "Valid image text" )}
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
      expect(game.title).to eq("Valid Title")
    end

    it "should return nil for an game initialized without arguments" do
      expect(game_initialized_without_arguments.title).to eq(nil)
    end
  end

  describe "#image" do
    it "should return the image" do
      expect(game.image).to eq("Valid image text")
    end

    it "should return nil for an game initialized without arguments" do
      expect(game_initialized_without_arguments.image).to eq(nil)
    end
  end
end
