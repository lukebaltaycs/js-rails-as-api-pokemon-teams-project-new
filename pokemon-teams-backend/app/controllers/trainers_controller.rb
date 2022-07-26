class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        options = {
            include: [:pokemons]
        }
        render json: TrainerSerializer.new(trainers, options)
    end

    def newpoke
        
        trainer = Trainer.find(params[:id])
        pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)

        options = {
            include: [:pokemons]
        }

        render json: TrainerSerializer.new(trainer, options)
        
    end

end
