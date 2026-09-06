# frozen_string_literal: true

module NanoRender
  module Menu
    module_function

    def setup
      Sketchup.require File.join(NanoRender::PLUGIN_ROOT, 'dialogs', 'main_dialog')

      UI.menu('Extensions').add_item(MENU_LABEL) do
        Dialogs::MainDialog.show
      end
    end
  end
end
