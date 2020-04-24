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

      expect(returned_json.length).to eq 12
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
end
