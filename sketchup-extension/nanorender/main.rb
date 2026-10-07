# frozen_string_literal: true

module NanoRender
  unless file_loaded?(__FILE__)
    PLUGIN_ROOT = File.expand_path(__dir__).freeze

    Sketchup.require File.join(PLUGIN_ROOT, 'extension_info')
    Sketchup.require File.join(PLUGIN_ROOT, 'menu')

    Menu.setup
    file_loaded(__FILE__)
  end
end
