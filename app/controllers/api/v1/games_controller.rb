class Api::V1::GamesController < ApplicationController
  def index
    render json: Game.all
  end

  def show
    render json: Game.find(params[:id])
  end

  def create
    game = Game.new(game_params)

    if game.save
      render json: game
    else
      render json: {error: game.errors.full_messages.to_sentence}
    end
  end

  private

  def game_params
    params.require(:game).permit(:title, :image, :number_of_players, :description, :creator, :platform, :genre, :site, :release_date)
  end

end
