ignore /\/_.*/
ignore /sass/
ignore /config\.rb/

root = Dir.pwd

layout 'layout.html.erb'


before 'index.html.erb' do
  system "cd #{ root } && compass compile"
end
