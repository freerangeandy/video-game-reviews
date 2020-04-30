class Api::V1::GamesController < ApplicationController
  before_action :authorize_user, except: [:index, :show, :create]

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

  protected

  def game_params
    params.require(:game).permit(:title, :image, :number_of_players, :description, :creator, :platform, :genre, :site, :release_date)
  end

  def authorize_user
    if !user_signed_in || !current_user.admin?
      flash[:notice] = "You do not have access to this page."
      redirect_to root_path
    end
  end
end
