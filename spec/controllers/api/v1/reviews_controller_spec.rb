require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:game1) { FactoryBot.create(:game) }
  let!(:game2) { FactoryBot.create(:game) }
  let!(:flimflam) { User.create(user_name: "flimflam", password: "2complex4u", password_confirmation: "2complex4u", email: "this@isntreal.com") }

  let!(:review1) { Review.create({
    rating: 3,
    comment: "Comment1",
    game: game1,
    user: flimflam
  })}

  let!(:review1) { Review.create({
    rating: 5,
    comment: "Comment2",
    game: game1,
    user: flimflam
  })}

  describe "POST#create" do
    it "posts a new review upon successful completion of the form" do
      post_json = {
        review: {
          rating: 4,
          comment: "It's pretty good",
          game_id: game1.id,
          user_id: flimflam.id
        }
      }

      prev_count = Game.find(game1.id).reviews.count

      post :create, params: post_json, format: :json
      expect(Game.find(game1.id).reviews.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted game" do
      post_json = {
        review: {
          rating: 4,
          comment: "It's pretty good",
          game_id: game1.id,
          user_id: flimflam.id
        }
      }

      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["rating"]).to eq(4)
      expect(returned_json["comment"]).to eq "It's pretty good"
    end

    it "gives errors when the rating isn't filled in" do
      post_json = {
        review: {
          rating: "",
          comment: "It's pretty good",
          game_id: game1.id,
          user_id: flimflam.id
        }
      }

      prev_count = Review.count
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Rating can't be blank and Rating is not a number"
      expect(Review.count).to eq(prev_count)
    end

    it "gives an error when the rating isn't a number" do
      post_json = {
        review: {
          rating: "N/A",
          comment: "It's pretty good",
          game_id: game1.id,
          user_id: flimflam.id
        }
      }

      prev_count = Review.count
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Rating is not a number"
      expect(Review.count).to eq(prev_count)
    end

    it "gives an error when the rating is greater than 5" do
      post_json = {
        review: {
          rating: 7,
          comment: "It's pretty good",
          game_id: game1.id,
          user_id: flimflam.id
        }
      }

      prev_count = Review.count
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Rating must be less than or equal to 5"
      expect(Review.count).to eq(prev_count)
    end
  end

end
