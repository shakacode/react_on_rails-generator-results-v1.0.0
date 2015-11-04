# Runs react_on_rails generators on master with varying options and puts each result in its own branch.
# You must pass in a version number so that the branches will be unique. For example:
#   rake all[10] will generate all results with a "-10" suffix on the branches.

RESULT_TYPES = %w(basic basic-server-rendering redux redux-server-rendering)
GENERATOR_OPTIONS = %w(redux server-rendering)
COMPARISON_TYPES = [
                     ["basic", "basic-server-rendering"],
                     ["redux", "redux-server-rendering"],
                     ["basic-server-rendering", "redux-server-rendering"],
                     ["basic", "redux"]
                   ]

# Define tasks to generate each result type app
RESULT_TYPES.each do |result_type|
  desc "generate #{result_type} app"
  task result_type, [:version] do |_task, args|
    sh %( git checkout master )
    sh %( git checkout -b #{result_type}-#{args[:version]} )
    sh %( cd tester_app && bundle install )

    generator_options = ""
    result_type.split(/-/, 2).each do |name_part|
      generator_options += " --#{name_part}" if GENERATOR_OPTIONS.include?(name_part)
    end
    sh %( cd tester_app && spring stop )
    sh %( cd tester_app && rails generate react_on_rails:install#{generator_options} )
    sh %( cd tester_app && bundle install )
    # sh %( cd tester_app/client && npm install )
    sh %( git add . )
    sh %( git commit -m "#{result_type.capitalize} App Generated v#{args[:version]}" )
  end
end

desc "generates all results and places them in their own branch"
task :all, [:version] do |_task, args|
  RESULT_TYPES.each do |result_type|
    Rake::Task[result_type].invoke(args[:version])
  end
end

desc "push all branches"
task "push_all", [:version] do |_task, args|
  RESULT_TYPES.each do |result_type|
    branch_name = "#{result_type}-#{args[:version]}"
    sh %( git checkout #{branch_name} )
    sh %( git push origin #{branch_name} -u )
  end

  COMPARISON_TYPES.each do |comparison_type|
    branch_name = "#{comparison_type[0]}-to-#{comparison_type[1]}-comparison-#{args[:version]}"
    sh %( git checkout #{branch_name} )
    sh %( git push origin #{branch_name} -u )
  end
end

# Requires `hub` command-line tool
desc "creates pull requests"
task "pull_all", [:version] do |_task, args|
  RESULT_TYPES.each do |result_type|
    branch_name = "#{result_type}-#{args[:version]}"
    sh %( git checkout #{branch_name} )
    sh %( hub pull-request -b master -h #{branch_name} )
  end

  COMPARISON_TYPES.each do |comparison_type|
    base_branch_name = "#{comparison_type[0]}-#{args[:version]}"

    head_branch_name = "#{comparison_type[0]}-to-#{comparison_type[1]}-comparison-#{args[:version]}"
    sh %( git checkout #{base_branch_name} )
    base_sha = `git rev-parse HEAD 2>/dev/null`.to_s.strip
    sh %( git checkout #{head_branch_name})
    head_sha = `git rev-parse HEAD 2>/dev/null`.to_s.strip

    message = "#{comparison_type[0].capitalize} -> #{comparison_type[1]} Generator Comparison v#{args[:version]}"

    sh %( hub pull-request -b #{base_sha} -h #{head_sha} -m #{message})
  end
end

desc "creates additional comparison project on each of the 4 branches"
task "compare_branches", [:version] do |_task, args|
  COMPARISON_TYPES.each do |comparison_type|
    base_branch = "#{comparison_type[0]}-#{args[:version]}"
    sh %( git checkout #{base_branch} )
    sh %( rm -rf tester_app )
    sh %( rails new tester_app --skip-bundle )

    gemfile_additions = "\\1\n\n"
    gemfile_additions << "gem 'react_on_rails', path: '../../react_on_rails'\n"
    gemfile_additions << "gem 'therubyracer'\n"

    old_gemfile_text = File.read("tester_app/Gemfile")
    new_gemfile_text = old_gemfile_text.gsub(/^source .*\n/, gemfile_additions)
    File.open("tester_app/Gemfile", "w") { |file| file.puts(new_gemfile_text) }

    sh %( cd tester_app && bundle install )
    sh %( cd tester_app && spring stop )

    generator_options = ""
    comparison_type[1].split(/-/, 2).each do |name_part|
      generator_options += " --#{name_part}" if GENERATOR_OPTIONS.include?(name_part)
    end

    sh %( cd tester_app && rails generate react_on_rails:install#{generator_options} )
    sh %( cd tester_app && spring stop )
    sh %( cd tester_app && bundle install )
    # sh %( cd tester_app/client && npm install )
    sh %( git checkout -b #{comparison_type[0]}-to-#{comparison_type[1]}-comparison-#{args[:version]})
    sh %( git add . )
    sh %( git commit -m "#{comparison_type[0].capitalize} -> #{comparison_type[1]} Generator Comparison  v#{args[:version]}" )
  end
end
