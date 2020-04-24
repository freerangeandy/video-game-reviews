require "rails_helper"

RSpec.describe Api::V1::GamesController, type: :controller do
  describe "GET#index" do
    let!(:game1) { FactoryBot.create(:game) }
    let!(:game2) { FactoryBot.create(:game) }
    let!(:game3) { FactoryBot.create(:game) }

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
end
