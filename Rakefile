require 'crxmake'
require 'rake/clean'

CRX_NAME = "markdown-linker"

CLOBBER << FileList["**/*.zip", "**/*.crx"]

#desc 'create crx and zip'
task :make do
# create crx
  CrxMake.make(
    ex_dir: "./src",
    pkey: "./src.pem",
    crx_output: "./package/#{CRX_NAME}.crx",
    verbose: true,
    ignorefile: /\.swp/,
    ignoredir: /\.(?:svn|git|cvs)/
  )

  # create zip for Google Extension Gallery
  CrxMake.zip(
    ex_dir: "./src",
    pkey: "./src.pem",
    zip_output: "./package/#{CRX_NAME}.zip",
    verbose: true,
    ignorefile: /\.swp/,
    ignoredir: /\.(?:svn|git|cvs)/
  )
end

desc 'open crx with browther'
task :open do
  `open ./package/#{CRX_NAME}.crx`
end

desc 'clobber & make'
task build: [:clobber, :make]

desc 'build & open'
task install: [:build, :open]

#task default: [:crxmake]