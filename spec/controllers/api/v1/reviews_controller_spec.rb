require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:game1) { FactoryBot.create(:game) }
  let!(:game2) { FactoryBot.create(:game) }
  
  let!(:review1) { Review.create({
    rating: 3,
    comment: "Comment1",
    game: game1
  })}

  let!(:review1) { Review.create({
    rating: 5,
    comment: "Comment2",
    game: game1
  })}

  describe "POST#create" do
    it "posts a new review upon successful completion of the form" do
      post_json = {
        review: {
          rating: 4,
          comment: "It's pretty good",
          game_id: game1.id
        }
      }

      prev_count = Game.find(game1.id).reviews.count

      post :create, params: post_json, format: :json
      expect(Game.find(game1.id).reviews.count).to eq(prev_count + 1)
    end

    xit "returns the json of the newly posted game" do
      post_json = {
        review: {
          rating: 4,
          comment: "It's pretty good"
        }
      }

      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      # expect(returned_json["title"]).to eq "Basset Hound Shakes Off"
      # expect(returned_json["image"]).to eq "https://media.giphy.com/media/WjjXDenYaxQys/giphy.gif"
      # expect(returned_json["number_of_players"]).to eq "1 human, 1 dog"
      # expect(returned_json["description"]).to eq "It's right there in the title"
      # expect(returned_json["creator"]).to eq "Doggy"
      # expect(returned_json["platform"]).to eq "PC"
      # expect(returned_json["genre"]).to eq "Puzzle"
      # expect(returned_json["site"]).to eq "http://www.dogdogdog.com/"
      # expect(returned_json["release_date"]).to eq "April 18, 2011"
    end

    xit "gives errors when the fields are incorrectly filled in" do
      post_json = {
        # game: {
        #   title: ""
        # }
      }

      prev_count = Game.count
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      # expect(returned_json["error"]).to eq "Title can't be blank"
      # expect(Game.count).to eq(prev_count)
    end
  end

end