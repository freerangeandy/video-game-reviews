class Api::V1::GamesController < ApplicationController
  def index
    render json: Game.all
  end
<<<<<<< HEAD

  def show
    render json: Game.find(params[:id])
  end
=======
>>>>>>> c06be150b91f1937a1924ae990dfc83a2d87f002
end
