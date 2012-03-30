ignore /\/_.*/     # ignore files with an underscore at the beginning
ignore /\/\..*/    # ignore dotfiles
ignore /Gemfile*/
ignore /sass/
ignore /comps/
ignore /javascripts\/app\/templates/
ignore /config\.rb/


root = Dir.pwd

layout 'layout-zoobank.html.erb'
layout 'index.html.erb' => 'layout.html.erb'


before 'index.html.erb' do
  system "cd #{ root } && compass compile"
end



helpers do
  def template(name) 
    html = "<script type='text/template' id='#{name}Template'>" +
           File.read("javascripts/app/templates/_#{name}.html.erb") +
           '</script>'
  end
  
  def clippy(text, bgcolor='#FFFFFF')
    html = <<-EOF
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="110"
              height="14"
              id="clippy" >
      <param name="movie" value="flash/clippy.swf"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="text=#{text}">
      <param name="bgcolor" value="#{bgcolor}">
      <embed src="flash/clippy.swf"
             width="110"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="text=#{text}"
             bgcolor="#{bgcolor}"
      />
      </object>
    EOF
  end
end
