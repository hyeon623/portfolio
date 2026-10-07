# frozen_string_literal: true

module NanoRender
  module Dialogs
    module MainDialog
      extend self

      PREF_KEY = 'NanoRender_MainDialog'
      HTML_FILE = File.join(NanoRender::PLUGIN_ROOT, 'html', 'dialog.html').freeze

      @dialog = nil

      def show
        if @dialog && @dialog.visible?
          @dialog.bring_to_front
          return
        end

        @dialog ||= create_dialog
        @dialog.show
      end

      private

      def create_dialog
        dialog = UI::HtmlDialog.new(
          dialog_title: EXTENSION_NAME,
          preferences_key: PREF_KEY,
          scrollable: false,
          resizable: true,
          width: 420,
          height: 260,
          style: UI::HtmlDialog::STYLE_DIALOG
        )

        dialog.set_file(HTML_FILE)
        dialog
      end
    end
  end
end
