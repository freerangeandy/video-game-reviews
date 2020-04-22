class Api::V1::GamesController < ApplicationController
    def index
        render json: {game: Game.all}
    end
end