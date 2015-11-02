class HelloWorldController < ApplicationController
  def index
    @hello_world_props = { initialName: "Stranger" }
  end
end
