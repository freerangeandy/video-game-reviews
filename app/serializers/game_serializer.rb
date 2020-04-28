class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :number_of_players, :description, :creator, :platform, :genre, :site, :release_date

  has_many :reviews
end