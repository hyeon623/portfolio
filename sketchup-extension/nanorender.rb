# frozen_string_literal: true

require 'sketchup.rb'
require 'extensions.rb'

module NanoRender
  unless file_loaded?(__FILE__)
    extension = SketchupExtension.new(
      'NanoRender for SketchUp',
      'nanorender/main'
    )
    extension.description = 'AI photorealistic rendering for SketchUp models.'
    extension.version     = '0.1.0'
    extension.creator     = 'NanoRender'
    extension.copyright   = "Copyright #{Time.now.year} NanoRender"

    Sketchup.register_extension(extension, true)
    file_loaded(__FILE__)
  end
end
