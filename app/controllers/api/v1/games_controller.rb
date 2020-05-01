class Api::V1::GamesController < ApplicationController
  before_action :authorize_user, except: [:index, :show, :create]

  def index
    render json: Game.all
  end

  def show
    game = Game.find(params[:id])
    render json: { 
      game: serialized_data(game, GameSerializer), 
      current_user: current_user
    }
  end

  def create
    game = Game.new(game_params)

    if game.save
      render json: game
    else
      render json: {error: game.errors.full_messages.to_sentence}
    end
  end

  def serialized_data(data, serializer)
    ActiveModelSerializers::SerializableResource.new(data, serializer: serializer)
  end

  protected

  def game_params
    params.require(:game).permit(:title, :image, :number_of_players, :description, :creator, :platform, :genre, :site, :release_date)
  end

  def authorize_user
    if !user_signed_in || !current_user.admin?
      raise ActionController::RoutingError.new("Not Found")
    end
  end

end
