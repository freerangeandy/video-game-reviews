class Api::V1::ReviewsController < Api::V1::GamesController
  def index
    @game = Game.find(params["game_id"])
    @reviews = @game.reviews
    render json: @reviews
  end
end
