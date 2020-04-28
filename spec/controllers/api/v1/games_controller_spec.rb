require "rails_helper"

RSpec.describe Api::V1::GamesController, type: :controller do
  let!(:game1) { FactoryBot.create(:game) }
  let!(:game2) { FactoryBot.create(:game) }
  let!(:game3) { FactoryBot.create(:game) }

  describe "GET#index" do
    it "returns a successful response status and a content type of JSON" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns all games in the database" do

      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["title"]).to eq game1.title
      expect(returned_json[1]["title"]).to eq game2.title
      expect(returned_json[2]["title"]).to eq game3.title
    end
  end

  describe "GET#show" do
    it "returns a successful response status and a content type of JSON" do
      get :show, params: {id: game1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")
    end

    it "returns the specific game" do
      get :show, params: {id: game1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json.length).to eq 11
      expect(returned_json["title"]).to eq game1.title
      expect(returned_json["image"]).to eq game1.image
      expect(returned_json["number_of_players"]).to eq game1.number_of_players
      expect(returned_json["description"]).to eq game1.description
      expect(returned_json["creator"]).to eq game1.creator
      expect(returned_json["platform"]).to eq game1.platform
      expect(returned_json["genre"]).to eq game1.genre
      expect(returned_json["site"]).to eq game1.site
      expect(returned_json["release_date"]).to eq game1.release_date
    end
  end

  describe "POST#create" do
    it "posts a new game upon successful completion of the form" do

      post_json = {
        game: {
          title: "Basset Hound Shakes Off",
        }
      }

      prev_count = Game.count

      post :create, params: post_json, format: :json
      expect(Game.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted game" do
      post_json = {
        game: {
          title: "Basset Hound Shakes Off",
          image: "https://media.giphy.com/media/WjjXDenYaxQys/giphy.gif",
          number_of_players: "1 human, 1 dog",
          description: "It's right there in the title",
          creator: "Doggy",
          platform: "PC",
          genre: "Puzzle",
          site: "http://www.dogdogdog.com/",
          release_date: "April 18, 2011"
        }
      }

      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["title"]).to eq "Basset Hound Shakes Off"
      expect(returned_json["image"]).to eq "https://media.giphy.com/media/WjjXDenYaxQys/giphy.gif"
      expect(returned_json["number_of_players"]).to eq "1 human, 1 dog"
      expect(returned_json["description"]).to eq "It's right there in the title"
      expect(returned_json["creator"]).to eq "Doggy"
      expect(returned_json["platform"]).to eq "PC"
      expect(returned_json["genre"]).to eq "Puzzle"
      expect(returned_json["site"]).to eq "http://www.dogdogdog.com/"
      expect(returned_json["release_date"]).to eq "April 18, 2011"
    end

    it "gives errors when the fields are incorrectly filled in" do
      post_json = {
        game: {
          title: ""
        }
      }

      prev_count = Game.count
      post(:create, params: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json["error"]).to eq "Title can't be blank"
      expect(Game.count).to eq(prev_count)
    end
  end
end
