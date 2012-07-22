require 'crxmake'

desc 'build chrome extension'
task 'build' do
# create crx
  CrxMake.make(
    ex_dir: "./src",
    #pkey: "./test.pem",
    crx_output: "./package/test.crx",
    verbose: true,
    ignorefile: /\.swp/,
    ignoredir: /\.(?:svn|git|cvs)/
  )

  # create zip for Google Extension Gallery
  CrxMake.zip(
    ex_dir: "./src",
    #pkey: "./test.pem",
    zip_output: "./package/test.zip",
    verbose: true,
    ignorefile: /\.swp/,
    ignoredir: /\.(?:svn|git|cvs)/
  )
end

#task default: [:crxmake]